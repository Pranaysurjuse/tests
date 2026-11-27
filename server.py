"""Lightweight static + JSON state server for Akiva Test Tracker on port 8080."""
import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "akiva_user_state.json")


class AkivaHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path.split("?")[0] == "/api/state":
            data = {}
            if os.path.exists(STATE_FILE):
                try:
                    with open(STATE_FILE, "r", encoding="utf-8") as f:
                        data = json.load(f)
                except Exception:
                    data = {}
            body = json.dumps(data).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.split("?")[0] == "/api/state":
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length) if length > 0 else b"{}"
            try:
                incoming = json.loads(raw.decode("utf-8"))
                existing = {}
                if os.path.exists(STATE_FILE):
                    try:
                        with open(STATE_FILE, "r", encoding="utf-8") as f:
                            existing = json.load(f)
                    except Exception:
                        existing = {}
                if isinstance(incoming, dict):
                    existing.update(incoming)
                    with open(STATE_FILE, "w", encoding="utf-8") as f:
                        json.dump(existing, f, indent=2)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"ok":true}')
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(str(e).encode("utf-8"))
            return
        self.send_response(404)
        self.end_headers()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    ThreadingHTTPServer(("0.0.0.0", 8080), AkivaHandler).serve_forever()
