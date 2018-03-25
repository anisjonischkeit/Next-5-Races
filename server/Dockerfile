FROM python:3

WORKDIR /usr/src/app/server

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "./src/server.py" ]