import json
import os
import math
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load JSON file safely, handling missing or empty files
def load_data(filename):
    """Load research papers from a JSON file."""
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

# Load dataset
papers = load_data("dataset.json")

# Preprocessing: Tokenization and Lowercasing
def tokenize(text):
    """Tokenize and convert text to lowercase."""
    return text.lower().split()

# Compute TF (Term Frequency)
def compute_tf(words):
    """Compute term frequency (TF) for a document."""
    tf = {}
    total_words = len(words)
    for word in words:
        tf[word] = tf.get(word, 0) + 1 / total_words
    return tf

# Compute IDF (Inverse Document Frequency)
def compute_idf(documents):
    """Compute IDF for terms across all documents."""
    num_docs = len(documents)
    idf = {}
    for doc in documents:
        for word in set(doc):
            idf[word] = idf.get(word, 0) + 1

    for word in idf:
        idf[word] = math.log(num_docs / (1 + idf[word]))  # Avoid division by zero
    return idf

# Compute TF-IDF
def compute_tf_idf(documents):
    """Compute TF-IDF matrix."""
    tokenized_docs = [tokenize(doc["title"] + " " + doc["abstract"]) for doc in documents]
    idf = compute_idf(tokenized_docs)
    tfidf_matrix = []

    for doc in tokenized_docs:
        tf = compute_tf(doc)
        tfidf_vector = {word: tf[word] * idf[word] for word in tf}
        tfidf_matrix.append(tfidf_vector)

    return tfidf_matrix, idf  # Returning IDF for later use

# Cosine Similarity Calculation
def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors."""
    common_words = set(vec1.keys()).intersection(set(vec2.keys()))
    
    dot_product = sum(vec1[word] * vec2[word] for word in common_words)
    magnitude1 = math.sqrt(sum(val ** 2 for val in vec1.values()))
    magnitude2 = math.sqrt(sum(val ** 2 for val in vec2.values()))
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0
    
    return dot_product / (magnitude1 * magnitude2)

# Compute global TF-IDF matrix and IDF once
tfidf_matrix, idf = compute_tf_idf(papers)

# Ensemble Hybrid Model (Stacking)
def ensemble_recommendation(query, papers, tfidf_matrix, idf):
    """Get recommendations based on query."""
    query_tokens = tokenize(query)
    query_tf = compute_tf(query_tokens)
    
    # Compute TF-IDF for query
    query_tfidf = {word: query_tf[word] * idf.get(word, 0) for word in query_tf}  

    # Compute Cosine Similarity for Content-Based Filtering
    content_scores = [cosine_similarity(query_tfidf, tfidf_matrix[i]) for i in range(len(papers))]

    # Sort by score
    final_scores = sorted(enumerate(content_scores), key=lambda x: x[1], reverse=True)
    
    # Return top 5 recommendations
    top_recommendations = [papers[i] for i, _ in final_scores[:25]]
    
    return top_recommendations

@app.route("/recommend", methods=["POST"])
def recommend():
    """API endpoint for getting recommendations."""
    data = request.get_json()
    query = data.get("query", "").strip()
    user_history = data.get("user_history", [])

    # 1️⃣ If `query` is given, use it for recommendations.
    if query:
        recommendations = ensemble_recommendation(query, papers, tfidf_matrix, idf)
    
    # 2️⃣ If `query` is not given but `user_history` is provided, use `user_history`.
    elif user_history:
        user_text = " ".join([history["title"] for history in user_history])
        recommendations = ensemble_recommendation(user_text, papers, tfidf_matrix, idf)
    
    # 3️⃣ If neither `query` nor `user_history` is given, return null.
    else:
        return jsonify({"recommended_titles": None}), 200

    # Return only titles and their paper IDs
    titles = [{"id": rec["id"], "title": rec["title"]} for rec in recommendations]

    return jsonify({"recommended_titles": titles}), 200

@app.route("/details", methods=["GET"])
def details():
    """API endpoint for fetching full paper details."""
    paper_id = request.args.get("id")
    if not paper_id:
        return jsonify({"error": "No paper ID provided."}), 400

    # Find the paper by ID
    paper = next((p for p in papers if p["id"] == paper_id), None)
    
    if not paper:
        return jsonify({"error": "Paper ID not found."}), 404
    
    return jsonify(paper)

if __name__ == "__main__":
    app.run(debug=True)
