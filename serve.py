#!/usr/bin/env python3
import http.server, os

PORT = int(os.environ.get("PORT", 3095))
DIR  = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    def log_message(self, fmt, *args):
        pass

print(f"Serving {DIR} on http://localhost:{PORT}", flush=True)
with http.server.HTTPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
