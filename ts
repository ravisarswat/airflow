cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc \
"set -x; getent hosts rmq01.ufact.ny2 || true; getent hosts rmq01.ufact.ny2.eexchange.com || true"


extra_hosts:
      - "rmq01.ufact.ny2:10.129.140.161"
      - "rmq01.ufact.ny2.eexchange.com:10.129.140.161"


cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc \
"set -x; getent hosts rmq01.ufact.ny2; getent hosts rmq01.ufact.ny2.eexchange.com"

