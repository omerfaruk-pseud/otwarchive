# Pin npm packages by running ./bin/importmap

pin "application"
pin "lexxy", to: "lexxy.js"
pin "@rails/activestorage", to: "activestorage.esm.js" # to support attachments
pin "trix"
pin "@rails/actiontext", to: "actiontext.esm.js"
