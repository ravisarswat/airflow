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
