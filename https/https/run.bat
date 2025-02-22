rm -r bin

mkdir bin

javac -Xlint -d ./bin -sourcepath . Main.java

cd bin

java  Main

pause