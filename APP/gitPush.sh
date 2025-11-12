# Запрашиваем ветку
echo "Введите ветку (по умолчанию main):"
read branch

# Если ветка пустая, используем main
if [ -z "$branch" ]; then
  branch="main"
fi

git add .
git commit -m "$commit_message"
git push -u origin "$branch"