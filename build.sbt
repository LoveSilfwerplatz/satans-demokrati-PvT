import NativePackagerKeys._

herokuAppName in Compile := "satans-demokrati-72"

libraryDependencies ++= Seq(
  "mysql" % "mysql-connector-java" % "5.1.38",
  "com.google.code.gson" % "gson" % "2.2"
)

name := """sd-rest-api"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)


lazy val myProject = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)
