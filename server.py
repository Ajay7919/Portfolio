#!/usr/bin/env python3
"""
Maddula Ajay Rathna - Portfolio Server
Serves the portfolio website on port 1910 (Ajay's profile1910)
and handles route aliases and API queries.
"""

import http.server
import socketserver
import urllib.parse
import json
import os
import sys
import threading

PRIMARY_PORT = 1910
SECONDARY_PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

PREFIXES = [
    "/ajaysprofile1910",
    "/ajays-profile1910",
    "/ajayprofile1910",
    "/ajay-profile-1910",
    "/ajay's-profile1910",
    "/ajay's profile1910",
    "/ajay's%20profile1910",
    "/profile1910",
]

KNOWLEDGE_BASE = {
    "about": {
        "answer": "Maddula Ajay Rathna is a detail-oriented Data Analyst experienced in Python, SQL, Tableau, and Excel. He specializes in data cleansing, trend analysis, predictive modeling, and executive dashboard development.",
        "sources": [{"title": "About Ajay", "url": "#about"}]
    },
    "skills": {
        "answer": "Ajay's technical competencies include Python, SQL, MySQL, Tableau, Microsoft Excel, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, and Git.",
        "sources": [{"title": "Technical Skills", "url": "#skills"}]
    },
    "experience": {
        "answer": "Ajay served as a Data Analyst Intern at SkillForge (2024–2025 in Bangalore), building scalable SQL extraction pipelines, conducting deep EDA, and creating Tableau dashboards.",
        "sources": [{"title": "Experience", "url": "#experience"}]
    },
    "projects": {
        "answer": "Ajay has created: 1. Movie Box Office Revenue Analysis & Forecasting, 2. Content Moderation & Sentiment Analysis System, and 3. Social Media Content Analysis.",
        "sources": [{"title": "Projects", "url": "#projects"}]
    },
    "contact": {
        "answer": "Contact Ajay via Email at maddulaajayrathna@gmail.com, Phone at +91-9642177022, or LinkedIn (linkedin.com/in/maddulaajay-rathna-287b451b1).",
        "sources": [{"title": "Contact", "url": "#contact"}]
    }
}

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def translate_path(self, path):
        # Normalize decoded path
        decoded_path = urllib.parse.unquote(path)
        lower_path = decoded_path.lower()

        # Handle route aliases like /ajaysprofile1910
        for prefix in PREFIXES:
            if lower_path == prefix or lower_path == prefix + "/":
                return os.path.join(DIRECTORY, "index.html")
            if lower_path.startswith(prefix + "/"):
                subpath = decoded_path[len(prefix) + 1:]
                return os.path.join(DIRECTORY, subpath)

        return super().translate_path(path)

    def do_GET(self):
        decoded_path = urllib.parse.unquote(self.path).lower().rstrip('/')
        for prefix in PREFIXES:
            if decoded_path == prefix:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                with open(os.path.join(DIRECTORY, "index.html"), "rb") as f:
                    self.wfile.write(f.read())
                return
        return super().do_GET()

    def do_POST(self):
        clean_path = self.path
        for prefix in PREFIXES:
            if clean_path.startswith(prefix):
                clean_path = clean_path[len(prefix):]
                break

        if clean_path in ['/api/chat', 'api/chat']:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                query = data.get('message', '').lower()
                
                resp = KNOWLEDGE_BASE['about']
                for key in ['skills', 'experience', 'projects', 'contact']:
                    if key in query:
                        resp = KNOWLEDGE_BASE[key]
                        break

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(resp).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"detail": str(e)}).encode('utf-8'))
            return

        elif clean_path in ['/api/contact', 'api/contact']:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            print(f"[Contact Form Submission]: {body}")
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "Message received"}).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

def serve_on_port(port):
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", port), PortfolioHandler) as httpd:
            httpd.serve_forever()
    except Exception as e:
        print(f"Server on port {port} stopped: {e}")

def run():
    print(f"\n=======================================================")
    print(f" 🚀 Ajay's profile1910 Live at:")
    print(f"    • http://localhost:{PRIMARY_PORT}")
    print(f"    • http://localhost:{PRIMARY_PORT}/ajaysprofile1910")
    print(f" 📄 Resume View:")
    print(f"    • http://localhost:{PRIMARY_PORT}/resume.html")
    print(f"=======================================================\n")
    sys.stdout.flush()

    # Start secondary port 3000 in background thread for backwards compatibility
    t = threading.Thread(target=serve_on_port, args=(SECONDARY_PORT,), daemon=True)
    t.start()

    # Run primary port 1910 on main thread
    serve_on_port(PRIMARY_PORT)

if __name__ == '__main__':
    run()
