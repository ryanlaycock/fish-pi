FROM resin/raspberry-pi-python:3

COPY camera.py /camera.py

RUN pip install picamera

ENTRYPOINT ["/usr/local/bin/python", "/camera.py"]