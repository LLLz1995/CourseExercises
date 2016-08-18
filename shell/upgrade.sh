#!/bin/bash

# Author : muxiaobai

#chmod +x ./test.sh  #ʹ�ű�����ִ��Ȩ��
#./test.sh  #ִ�нű�
#TOMCAT_HOME="/user/local/apache-tomcat-8.0.36"
#LOG_HOME="/data/shelllog/upgrade"
#WAR_HOME="/data/war"
TOMCAT_HOME="/c/apache-tomcat-8.0.36"
TOMCAT_PORT=8080
FILE_NAME=`date "+%Y%m%d%H%M%S"`
LOG_HOME="/c/Users/zhang/Desktop"
LOG_FILE_NAME="$FILE_NAME.log"
LOG_FILE_PATH="$LOG_HOME/$LOG_FILE_NAME"

WAR_HOME="$LOG_HOME"

TIME=`date "+%Y-%m-%d %H:%M:%S"`
#FILE_NAME="upload"
currentTime=`date "+%Y-%m-%d %H:%M:%S"`
echo "�ű���ʼִ��ʱ�䣺$currentTime" >> "$LOG_FILE_PATH"
startupsh="$TOMCAT_HOME/bin/startup.bat"
shutdownsh="$TOMCAT_HOME/bin/shutdown.bat"
echo "LOG�ļ�·����$LOG_FILE_PATH" >> "$LOG_FILE_PATH"
echo "����Tomcat�ű���ַ��$startupsh" >>"$LOG_FILE_PATH"
echo "�ر�tomcat�ű���ַ��$shutdownsh" >>"$LOG_FILE_PATH"

# first judge `WAR_HOME` has `SSH.war` if there are then next ,else shell.sh don't run .

# if has SSH.war then rename ROOT.war

echo "�������ļ�SSH==>ROOT" >> "$LOG_FILE_PATH"
cp $WAR_HOME/SSH.war $WAR_HOME/ROOT.war
# if tomcat is run should stop .else skip this  `stop tomcat` step 

cd $TOMCAT_HOME
	echo "$TIME ���ڹر�tomcat..." >>"$LOG_FILE_PATH"
	$shutdownsh
	echo "tomcat�Ѿ��ر�" >>"$LOG_FILE_PATH"
sleep 2s;
#copy old war 
echo "Old War Name $FILE_NAME.war" >>"$LOG_FILE_PATH"
cp $TOMCAT_HOME/webapps/ROOT.war $WAR_HOME/$FILE_NAME.war

# remove old war and file

rm -rf $TOMCAT_HOME/webapps/ROOT*
sleep 2s;
#copy new war
echo " $TIME ���ڿ�������Ŀ..." >>"$LOG_FILE_PATH"
cp $WAR_HOME/ROOT.war $TOMCAT_HOME/webapps/
sleep 2s;
#start tomcat 
echo " $TIME ��������Tomcat..." >>"$LOG_FILE_PATH"
$startupsh
echo "$TIME ����Tomcat�ɹ�..." >>"$LOG_FILE_PATH"
