import os
import glob
import time
from flask import Flask
from flask_cors import CORS

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folders = glob.glob(base_dir + '28*')


def read_temp_raw(device_file):
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines


def read_temp(device_file):
    lines = read_temp_raw(device_file)
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw(device_file)
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos + 2:]
        temp_c = float(temp_string) / 1000.0
        return str(temp_c)


app = Flask(__name__)

CORS(app)


@app.route('/temp')
def get_temp():
    return read_temp(device_folders[0] + '/w1_slave')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
