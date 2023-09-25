//? what is version control
//? what is LVCS, CVCS, DVCS
//? what is git
//? in which folder git database is stored
//? what are the three states in git
//? which directory is copied when you git clone
//? what are tracked and untracked files
//? what are 2 types of tags in git
//? explain commit, tree, blob, master and HEAD
//? what is merge commit
//? what is a tracking and upstream branch
//? what is the benifit of tracking branch
//? if we create a local branch with the same name as remote branch, will tracking be set automatically
//? difference between git merge and git rebase
//? when to use git merge and when to use git rebase
//? which protocalls git supports to transfer data
//? where can we host our git repo
//? how many types of distributed workflows are there
//? fork a repo in github
//? how to contribute to a project using 1) github and 2) email
//? git am vs git apply
// accepting contribution => add origin -> fetch -> create new branch tracking new origin -> merge into old origin
// github -> shift + > -> open repo your repo in github codespaces
// configure husky with git hooks to run prettier and eslint before commit or push
//--------------------------------------------------
// git init
// git add
// git commit -m "message"
// git commit -am "message"
// git status -s
// git config --global user.name "Sachin Sharma"
// git rm --cached index.txt
// git log -p
// git log --oneline --graph
// git log --format= "%h - %an, %ae, %cn, %ce, %cd : %s"
// git log --since="2 hours ago"
// git log --until="2 hours ago"
// git log --all --oneline
// git log -S "function_name"
// git log --follow "file_name"
// git commit --amend -m "message"
// git commit --ament --no-edit
// git checkout {commit-id} {file-name}
// git remote
// git fetch  git merge
// git log {remote-name}/{branch-name}
// git branch -m {new-name}
// git push -u origin {new-name}
// git fetch -all
// git checkout {new-name}
// git branch -d {branch}
// git remote prune origin
// git remote rename {old} {new}
// git remote rm origin
// git tag
// git tag --list "v1.0*"
// git show v1.0
// git tag {tag-name} {commit-id}
// git push --tags
// git tag -d {tag-name}
// git push --delete origin {tag-name}
// git config --global alias.lg "log --oneline"
// git branch {branch-name}
// git checkout {branch-name}
// git log {branch-name}
// git checkout -b {branch-name}
// git merge {branch-name}
// git push -u origin main
// git branch --all
// git push --delete origin {branch-name}
// git remote add tracking {url}
// git push origin sachin:main
// git merge origin/sachin
// git checkout -b sachin origin/sachin
// git branch -u origin/master
// git merge @{u}
// git branch -vv
// git pull
// git pull --rebase
// git diff HEAD~1 HEAD > patch_file.patch
// git branch {branch-name} {other-branch-name}
// git apply --check {location of path file}
// git apply {location of patch file}
// git format-patch -1 {commit-id} -o patches
// git am {location of patch file}
// git push  --force 
// git push --set-upstream origin {branch-name}
// git branch --set-upstream-to=origin/main {branch-name}
// git revert HEAD~2 
// git stash save myWork 
// git stash list
// git stash apply {stash-id}
// git stash drop {stash-id}
// git bisect start
// git bisect bad {bad-commit-id}
// git bisect good {good-commit-id}