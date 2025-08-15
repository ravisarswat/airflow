cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc \
"set -x; getent hosts rmq01.ufact.ny2 || true; getent hosts rmq01.ufact.ny2.eexchange.com || true"


extra_hosts:
      - "rmq01.ufact.ny2:10.129.140.161"
      - "rmq01.ufact.ny2.eexchange.com:10.129.140.161"


cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc \
"set -x; getent hosts rmq01.ufact.ny2; getent hosts rmq01.ufact.ny2.eexchange.com"

podman --version
podman info --format '{{.Host.Os}} {{.Host.Kernel}} | netBackend={{.NetworkBackend}} | cgroups={{.Host.CgroupVersion}}'
podman network ls


podman run --rm --network airflow2_default alpine:3.19 sh -c '
apk add --no-cache bind-tools >/dev/null 2>&1
nslookup rmq01.ufact.ny2 || true
ping -c1 rmq01.ufact.ny2 || true
'

NO_PROXY=localhost,127.0.0.1,10.129.140.161,rmq01.ufact.ny2,rmq01.ufact.ny2.eexchange.com
no_proxy=localhost,127.0.0.1,10.129.140.161,rmq01.ufact.ny2,rmq01.ufact.ny2.eexchange.com


cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc '
env | egrep -i "http_proxy|https_proxy|no_proxy" || true
python - <<PY
import socket
for host,port,name in (("10.129.140.161",3306,"MySQL"),("10.129.140.161",5672,"RabbitMQ")):
    s=socket.socket(); s.settimeout(3)
    try:
        s.connect((host,port)); print(f"{name} TCP OK")
    except Exception as e:
        print(f"{name} TCP FAIL:", e)
    finally:
        s.close()
PY'


