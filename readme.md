# API for CSV File Upload and Send To Another API As JSON

```bash
curl --location 'http://localhost:3000/upload' \
--form 'file=@"postman-cloud:///1eed29b9-c578-47d0-87cf-659f8a37fe03"'
```

```json
{
    "message": "CSV processed successfully",
    "recordsProcessed": 5,
    "apiResponse": "This URL has no default content configured. <a href=\"https://webhook.site/#!/view/ae427173-4eb8-4ed8-94cd-26f45c6dde4f\">View in Webhook.site</a>."
}
```