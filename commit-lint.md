# Husky commit-message

To restrict the commit message, first configure the husky in project

For detail visit [husky](https://typicode.github.io/husky/getting-started.html).

Create a file named `commit-msg` inside the husky folder.

Add the following script into the commit-msg file:

```bash
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"
message=$(cat "$1")
requiredPattern="^NEXT-[0-9]+: .+$"
if ! echo "$message" | grep -Eq "$requiredPattern"; then
  echo "-"
  echo "-"
  echo "-"
  echo ":rotating_light: Wrong commit message! :confused:"
  echo "The commit message must have this format:"
  echo "NEXT-Ticket No: any commit message"
  echo "-"
  echo "Your commit message was:"
  echo "$message"
  echo "-"
  exit 1
fi
```
