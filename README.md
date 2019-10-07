# Gulp-assembler
_fe-assembler for beetroot-students_

**Required:**
* Clone assembler's repo:
```
git clone https://github.com/davaynamore/gulp-assembler.git
```

* Install [Node.js](https://nodejs.org/uk/)
* Install `gulp-cli`:
```
npm install gulp-cli -g
```
if MacOS
```
sudo npm install gulp-cli -g
```

**To create new project:**
* Move to assembler's directory:
```
cd assembler's_root_directory
```
* Install dependencies:
```
npm i
```
* Add your projects directory as gitmodule:
```
git submodule add -f https://github.com/{username}/{username}.github.io.git projects
```
* Start this command:
```
git rm --cached -f projects
```
* To start development run:
```
gulp ---project's_directory_name
```
or run
```
npm run help
```
