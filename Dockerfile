# 1) Image de base Python
FROM python:3.11-slim

# 2) Quelques réglages "propres"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3) Dossier de travail dans le conteneur
WORKDIR /app


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 5) Copier tout le code de ton projet dans l'image
COPY . .

# 6) Exposer le port sur lequel ton app écoute (souvent 5000 avec Flask)
EXPOSE 5000

# 7) Commande de démarrage du conteneur
# On suppose que ton point d'entrée est app.py
CMD ["python", "app.py"]
