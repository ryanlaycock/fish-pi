FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY requirements.txt /app
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

CMD [ "python3", "-u", "temp.py" ]