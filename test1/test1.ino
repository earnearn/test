#include <ESP8266WiFi.h>
#include <Ethernet.h>
#include <SPI.h>

const char *ssid = "BabyCat";
const char *passw = "1111111110";

const char host[] =  "restroom-nodejs.herokuapp.com";
#define port 80

String _str, _res,  _t;
int  t = 0;



void setup() {
  pinMode (D6, INPUT); //sensor1
  pinMode (D7, INPUT); //sensor2
  Serial.begin(9600);

  WiFi.begin(ssid, passw);
  Serial.print("WiFi connecting..");
  while ((WiFi.status() != WL_CONNECTED))
  {
    delay(1000);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Connected !");

  }
  else
  {
    Serial.println("Disconnected !");
  }

}
int count = 0;
bool In1 = false;
bool Out1 = false;
void loop() {
  if (!digitalRead(D6)) {
    delay(200);
    In1 = true;
    if (In1 && (!digitalRead(D7))) {
      In1 = false; count ++;
      Serial.print("จำนวนคนที่อยู่ภายในห้องน้ำสาธารณะ : ");
      Serial.print(count); Serial.println(" คน");
       WriteDHT(count);
    }
  }
  if (!digitalRead(D7)) {
    delay(200);
    Out1 = true;
    if (Out1 && (!digitalRead(D6))) {
      Out1 = false; count --;
      Serial.print("จำนวนคนที่อยู่ภายในห้องน้ำสาธารณะ : ");
      if (count < 0)count = 0;
      Serial.print(count); Serial.println(" คน");

       WriteDHT(count);
    }
  }
 
}


String WriteDHT(int t)
{
  _t = String(t);
  WiFiClient client;
  if (client.connect(host, port))
  {
    _str = "GET /update/";
    _str += _t;
    _str += " HTTP/1.1\r\n";
    _str += "Host: ";
    _str += host;
    _str += ":";
    _str += port;
    _str += "\r\n";
    _str += "Connection: keep-alive\r\n\r\n";
    client.print(_str);
    Serial.println("Add Data to MongoDB Success");
    while (client.available())
    {
      _res = client.readStringUntil('\r');
    }
    return _res;
  }
  else
  {
    // Nothing..
  }
}
