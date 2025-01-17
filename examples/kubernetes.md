# Example use in Kubernetes

## Example POD with two processes

This example will create a single POD with two containers:

- clamd - will run the api
- freshclam - will ensure the api has upto date virus definitions

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: clamav
  labels:
    name: clamav
spec:
  replicas: 1
  selector:
    name: clamav
  template:
    metadata:
      labels:
        name: clamav
        namespace: clamav
    spec:
      containers:
        - name: clamd
          image: harbor.pytheascapital.net/pytheas/clamav:0.104.0
          env:
            - name: UPDATE
              value: "false"
          ports:
            - containerPort: 3310
              name: api
              protocol: TCP
          volumeMounts:
            - mountPath: /var/lib/clamav
              name: avdata
          livenessProbe:
            exec:
              command:
                - /readyness.sh
            initialDelaySeconds: 20
            timeoutSeconds: 2
        - name: freshclam
          image: harbor.pytheascapital.net/pytheas/clamav:0.104.0
          env:
            - name: UPDATE_ONLY
              value: "true"
          volumeMounts:
            - mountPath: /var/lib/clamav
              name: avdata
          livenessProbe:
            exec:
              command:
                - /readyness.sh
            initialDelaySeconds: 20
            timeoutSeconds: 2
      volumes:
        - name: avdata
          source:
            emptyDir: {}
```
