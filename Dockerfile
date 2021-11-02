FROM clamav/clamav:latest

COPY --chown=clamav_user:clamav eicar.com /
COPY --chown=clamav_user:clamav ./readyness.sh /
EXPOSE 3310
EXPOSE 7357