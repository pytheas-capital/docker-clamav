FROM debian:stable

ENV CLAM_VERSION=0.104.0


# Configure Clam AV...
COPY --chown=clamav_user:clamav ./*.conf /usr/local/etc/
COPY --chown=clamav_user:clamav eicar.com /
COPY --chown=clamav_user:clamav ./readyness.sh /


RUN apt-get update && apt-get install -y wget bash && apt-get dist-upgrade && \
    wget https://www.clamav.net/downloads/production/clamav-${CLAM_VERSION}.linux.x86_64.deb  && \
    dpkg -i ./clamav-${CLAM_VERSION}.linux.x86_64.deb && rm clamav-${CLAM_VERSION}.linux.x86_64.deb &&\
    addgroup --gid 1000 clamav && useradd --home /var/lib/clamav --uid 1000 --gid 1000   clamav_user && \
    mkdir -p /var/lib/clamav && \
    mkdir /usr/local/share/clamav && \
    chown -R clamav_user:clamav /var/lib/clamav /usr/local/share/clamav /usr/local/etc/ && \
    mkdir /var/run/clamav && \
    chown clamav_user:clamav /var/run/clamav && \
    chmod 750 /var/run/clamav

USER 1000

# initial update of av databases
RUN freshclam

VOLUME /var/lib/clamav
COPY --chown=clamav_user:clamav docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3310
