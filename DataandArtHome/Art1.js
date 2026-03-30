import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  rectangleLabel: {
    fill: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.7,
    zIndex: 5,
    top: 20,
    right: 20,
  },
});

export default function Art1({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [flightData, setFlightData] = useState([]);
  
  // Add escape key functionality for web ==================
  useEscapeKey(() => navigation.goBack());

  // Load and process CSV data
  useEffect(() => {
    const processFlightData = () => {
      // Raw CSV data as string (simplified approach for React Native)
      const csvData = `Date,From,To,Flight_Number,Airline,Distance,Duration,Seat,Seat_Type,Class,Reason,Plane,Registration,Trip,Note,From_OID,To_OID,Airline_OID,Plane_OID
- -,GRU,AEP,Aerolineas Argentinas (AR),Aerolineas Argentinas,1052,02:36,,,,,738,,,"Direct",2564,2442,412,
- -,GRU,AEP,City Connexion Airlines (G3),City Connexion Airlines,1052,02:36,,,,,738,,,"Direct",2564,2442,1790,
- -,GRU,AEP,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1052,02:36,,,,,320,,,"Direct",2564,2442,4867,
- -,GRU,AGT,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,544,01:35,,,,,320,,,"Codeshare",2564,4305,4867,
- -,GRU,AGT,TAM Mercosur (PZ),TAM Mercosur,544,01:35,,,,,320,,,"Direct",2564,4305,5156,
- -,GRU,AJU,City Connexion Airlines (G3),City Connexion Airlines,1059,02:37,,,,,738 73G,,,"Direct",2564,2522,1790,
- -,GRU,AJU,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1059,02:37,,,,,320,,,"Direct",2564,2522,4867,
- -,GRU,AMS,KLM Royal Dutch Airlines (KL),KLM Royal Dutch Airlines,6070,12:38,,,,,777,,,"Direct",2564,580,3090,
- -,GRU,ASU,City Connexion Airlines (G3),City Connexion Airlines,705,01:54,,,,,738 73G,,,"Direct",2564,2699,1790,
- -,GRU,ASU,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,705,01:54,,,,,320,,,"Direct",2564,2699,4867,
- -,GRU,ASU,TAM Mercosur (PZ),TAM Mercosur,705,01:54,,,,,320,,,"Direct",2564,2699,5156,
- -,GRU,ATL,Delta Air Lines (DL),Delta Air Lines,4664,09:49,,,,,76W,,,"Direct",2564,3682,2009,
- -,GRU,AUH,Etihad Airways (EY),Etihad Airways,7527,15:33,,,,,345,,,"Direct",2564,2179,2222,
- -,GRU,BCN,Singapore Airlines (SQ),Singapore Airlines,5443,11:23,,,,,77W,,,"Direct",2564,1218,4435,
- -,GRU,BEL,City Connexion Airlines (G3),City Connexion Airlines,1528,03:33,,,,,73G 738,,,"Direct",2564,2526,1790,
- -,GRU,BEL,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1528,03:33,,,,,320,,,"Direct",2564,2526,4867,
- -,GRU,BGI,City Connexion Airlines (G3),City Connexion Airlines,2670,05:50,,,,,738,,,"Direct",2564,2875,1790,
- -,GRU,BOG,Avianca - Aerovias Nacionales de Colombia (AV),Avianca - Aerovias Nacionales de Colombia,2692,05:53,,,,,319 330,,,"Direct",2564,2709,515,
- -,GRU,BOG,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,2692,05:53,,,,,763,,,"Direct",2564,2709,4867,
- -,GRU,BOG,LAN Airlines (LA),LAN Airlines,2692,05:53,,,,,763,,,"Codeshare",2564,2709,3200,
- -,GRU,BPS,City Connexion Airlines (G3),City Connexion Airlines,680,01:51,,,,,738,,,"Direct",2564,4209,1790,
- -,GRU,BPS,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,680,01:51,,,,,320,,,"Direct",2564,4209,4867,
- -,GRU,BSB,City Connexion Airlines (G3),City Connexion Airlines,530,01:33,,,,,738 73G,,,"Direct",2564,2531,1790,
- -,GRU,BSB,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,530,01:33,,,,,321 320,,,"Direct",2564,2531,4867,
- -,GRU,BSB,Oceanair (O6),Oceanair,530,01:33,,,,,320 318,,,"Direct",2564,2531,3764,
- -,GRU,CAC,Changan Airlines (2Z),Changan Airlines,455,01:24,,,,,AT7,,,"Direct",2564,2535,1729,
- -,GRU,CBB,Astrakhan Airlines (OB),Astrakhan Airlines,1339,03:10,,,,,733,,,"Direct",2564,2759,462,
- -,GRU,CCS,City Connexion Airlines (G3),City Connexion Airlines,2728,05:57,,,,,738,,,"Direct",2564,2851,1790,
- -,GRU,CCS,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,2728,05:57,,,,,320,,,"Direct",2564,2851,4867,
- -,GRU,CDG,Air France (AF),Air France,5840,12:10,,,,,77W 772,,,"Direct",2564,1382,137,
- -,GRU,CDG,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5840,12:10,,,,,773,,,"Direct",2564,1382,4867,
- -,GRU,CGB,City Connexion Airlines (G3),City Connexion Airlines,825,02:09,,,,,738 73G,,,"Direct",2564,2548,1790,
- -,GRU,CGB,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,825,02:09,,,,,320,,,"Direct",2564,2548,4867,
- -,GRU,CGB,Oceanair (O6),Oceanair,825,02:09,,,,,318,,,"Direct",2564,2548,3764,
- -,GRU,CGR,City Connexion Airlines (G3),City Connexion Airlines,563,01:37,,,,,738,,,"Direct",2564,2538,1790,
- -,GRU,CGR,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,563,01:37,,,,,320,,,"Direct",2564,2538,4867,
- -,GRU,CLT,American Airlines (AA),American Airlines,4635,09:46,,,,,332,,,"Direct",2564,3876,24,
- -,GRU,CLT,US Airways (US),US Airways,4635,09:46,,,,,332,,,"Direct",2564,3876,5265,
- -,GRU,CMN,Royal Air Maroc (AT),Royal Air Maroc,4682,09:51,,,,,763,,,"Direct",2564,1074,4248,
- -,GRU,CNF,City Connexion Airlines (G3),City Connexion Airlines,308,01:06,,,,,738 73G,,,"Direct",2564,2537,1790,
- -,GRU,CNF,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,308,01:06,,,,,321 320,,,"Direct",2564,2537,4867,
- -,GRU,COR,City Connexion Airlines (G3),City Connexion Airlines,1214,02:55,,,,,738,,,"Direct",2564,2443,1790,
- -,GRU,CWB,City Connexion Airlines (G3),City Connexion Airlines,223,00:56,,,,,738,,,"Direct",2564,2545,1790,
- -,GRU,CWB,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,223,00:56,,,,,320,,,"Direct",2564,2545,4867,
- -,GRU,CWB,Lufthansa (LH),Lufthansa,223,00:56,,,,,320,,,"Codeshare",2564,2545,3320,
- -,GRU,DFW,American Airlines (AA),American Airlines,5119,10:44,,,,,77W,,,"Direct",2564,3670,24,
- -,GRU,DFW,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5119,10:44,,,,,77W,,,"Direct",2564,3670,4867,
- -,GRU,DFW,US Airways (US),US Airways,5119,10:44,,,,,77W,,,"Direct",2564,3670,5265,
- -,GRU,DOH,Qatar Airways (QR),Qatar Airways,7364,15:13,,,,,77L,,,"Direct",2564,11051,4091,
- -,GRU,DOU,Changan Airlines (2Z),Changan Airlines,544,01:35,,,,,AT7,,,"Direct",2564,7380,1729,
- -,GRU,DTW,Delta Air Lines (DL),Delta Air Lines,5107,10:42,,,,,76W,,,"Direct",2564,3645,2009,
- -,GRU,DTW,City Connexion Airlines (G3),City Connexion Airlines,5107,10:42,,,,,76W,,,"Direct",2564,3645,1790,
- -,GRU,DXB,Emirates (EK),Emirates,7587,15:40,,,,,77W,,,"Direct",2564,2188,2183,
- -,GRU,EWR,United Airlines (UA),United Airlines,4771,10:02,,,,,764,,,"Direct",2564,3494,5209,
- -,GRU,EZE,Aerolineas Argentinas (AR),Aerolineas Argentinas,1069,02:38,,,,,E90,,,"Codeshare",2564,3988,412,
- -,GRU,EZE,City Connexion Airlines (G3),City Connexion Airlines,1069,02:38,,,,,738,,,"Direct",2564,3988,1790,
- -,GRU,EZE,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1069,02:38,,,,,330 320,,,"Direct",2564,3988,4867,
- -,GRU,EZE,LAN Airlines (LA),LAN Airlines,1069,02:38,,,,,330 320,,,"Codeshare",2564,3988,3200,
- -,GRU,EZE,TAM Mercosur (PZ),TAM Mercosur,1069,02:38,,,,,320,,,"Direct",2564,3988,5156,
- -,GRU,EZE,Qatar Airways (QR),Qatar Airways,1069,02:38,,,,,77L,,,"Direct",2564,3988,4091,
- -,GRU,EZE,Turkish Airlines (TK),Turkish Airlines,1069,02:38,,,,,343,,,"Direct",2564,3988,4951,
- -,GRU,FCO,Alitalia (AZ),Alitalia,5857,12:12,,,,,772,,,"Direct",2564,1555,596,
- -,GRU,FLN,City Connexion Airlines (G3),City Connexion Airlines,319,01:08,,,,,738 73G,,,"Direct",2564,2555,1790,
- -,GRU,FLN,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,319,01:08,,,,,320,,,"Direct",2564,2555,4867,
- -,GRU,FLN,Oceanair (O6),Oceanair,319,01:08,,,,,318 320,,,"Direct",2564,2555,3764,
- -,GRU,FOR,City Connexion Airlines (G3),City Connexion Airlines,1457,03:24,,,,,73G 738,,,"Direct",2564,2559,1790,
- -,GRU,FOR,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1457,03:24,,,,,321 320,,,"Direct",2564,2559,4867,
- -,GRU,FOR,Oceanair (O6),Oceanair,1457,03:24,,,,,320 318,,,"Direct",2564,2559,3764,
- -,GRU,FRA,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,6084,12:40,,,,,773,,,"Direct",2564,340,4867,
- -,GRU,FRA,Lufthansa (LH),Lufthansa,6084,12:40,,,,,74H,,,"Direct",2564,340,3320,
- -,GRU,GIG,City Connexion Airlines (G3),City Connexion Airlines,209,00:55,,,,,738 73G,,,"Direct",2564,2560,1790,
- -,GRU,GIG,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,209,00:55,,,,,320 319,,,"Direct",2564,2560,4867,
- -,GRU,GIG,Oceanair (O6),Oceanair,209,00:55,,,,,318,,,"Direct",2564,2560,3764,
- -,GRU,GIG,United Airlines (UA),United Airlines,209,00:55,,,,,777,,,"Direct",2564,2560,5209,
- -,GRU,GYN,City Connexion Airlines (G3),City Connexion Airlines,502,01:30,,,,,738 73G,,,"Direct",2564,2562,1790,
- -,GRU,GYN,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,502,01:30,,,,,320,,,"Direct",2564,2562,4867,
- -,GRU,IAD,United Airlines (UA),United Airlines,4750,10:00,,,,,777,,,"Direct",2564,3714,5209,
- -,GRU,IAH,United Airlines (UA),United Airlines,4909,10:19,,,,,763,,,"Direct",2564,3550,5209,
- -,GRU,IGU,City Connexion Airlines (G3),City Connexion Airlines,524,01:32,,,,,738 73G,,,"Direct",2564,2554,1790,
- -,GRU,IGU,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,524,01:32,,,,,320 319,,,"Direct",2564,2554,4867,
- -,GRU,ISL,Turkish Airlines (TK),Turkish Airlines,6551,13:36,,,,,343,,,"Direct",2564,1701,4951,
- -,GRU,JDO,Oceanair (O6),Oceanair,1217,02:56,,,,,318,,,"Direct",2564,6034,3764,
- -,GRU,JFK,American Airlines (AA),American Airlines,4759,10:01,,,,,77W 777 773,,,"Direct",2564,3797,24,
- -,GRU,JFK,Delta Air Lines (DL),Delta Air Lines,4759,10:01,,,,,764,,,"Direct",2564,3797,2009,
- -,GRU,JFK,City Connexion Airlines (G3),City Connexion Airlines,4759,10:01,,,,,764,,,"Direct",2564,3797,1790,
- -,GRU,JFK,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,4759,10:01,,,,,773 77W 777,,,"Direct",2564,3797,4867,
- -,GRU,JFK,US Airways (US),US Airways,4759,10:01,,,,,77W 777,,,"Direct",2564,3797,5265,
- -,GRU,JNB,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,4619,09:44,,,,,346 332 343,,,"Direct",2564,813,4867,
- -,GRU,JNB,South African Airways (SA),South African Airways,4619,09:44,,,,,346 332 343,,,"Direct",2564,813,4305,
- -,GRU,JOI,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,241,00:58,,,,,319,,,"Direct",2564,2576,4867,
- -,GRU,JPA,City Connexion Airlines (G3),City Connexion Airlines,1359,03:13,,,,,738,,,"Direct",2564,2575,1790,
- -,GRU,JPA,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1359,03:13,,,,,320,,,"Direct",2564,2575,4867,
- -,GRU,LAD,TAAG Angola Airlines (DT),TAAG Angola Airlines,4057,08:36,,,,,77W,,,"Direct",2564,951,5133,
- -,GRU,LAX,American Airlines (AA),American Airlines,6159,12:49,,,,,777,,,"Direct",2564,3484,24,
- -,GRU,LAX,Korean Air (KE),Korean Air,6159,12:49,,,,,77W,,,"Direct",2564,3484,3163,
- -,GRU,LAX,US Airways (US),US Airways,6159,12:49,,,,,777,,,"Direct",2564,3484,5265,
- -,GRU,LDB,City Connexion Airlines (G3),City Connexion Airlines,295,01:05,,,,,738 73G,,,"Direct",2564,2581,1790,
- -,GRU,LDB,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,295,01:05,,,,,320,,,"Direct",2564,2581,4867,
- -,GRU,LFW,Ethiopian Airlines (ET),Ethiopian Airlines,3810,08:07,,,,,788,,,"Direct",2564,298,2220,
- -,GRU,LHR,British Airways (BA),British Airways,5874,12:14,,,,,744,,,"Direct",2564,507,1355,
- -,GRU,LHR,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5874,12:14,,,,,773,,,"Direct",2564,507,4867,
- -,GRU,LIM,Avianca - Aerovias Nacionales de Colombia (AV),Avianca - Aerovias Nacionales de Colombia,2157,04:48,,,,,321,,,"Codeshare",2564,2789,515,
- -,GRU,LIM,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,2157,04:48,,,,,320,,,"Direct",2564,2789,4867,
- -,GRU,LIM,LAN Airlines (LA),LAN Airlines,2157,04:48,,,,,320 763,,,"Codeshare",2564,2789,3200,
- -,GRU,LIM,Grupo TACA (TA),Grupo TACA,2157,04:48,,,,,321,,,"Codeshare",2564,2789,2622,
- -,GRU,LIS,TAP Portugal (TP),TAP Portugal,4927,10:21,,,,,343 332,,,"Direct",2564,1638,4869,
- -,GRU,MAD,Air China (CA),Air China,5202,10:54,,,,,330,,,"Direct",2564,1229,751,
- -,GRU,MAD,Iberia Airlines (IB),Iberia Airlines,5202,10:54,,,,,345 342 346,,,"Direct",2564,1229,2822,
- -,GRU,MAD,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5202,10:54,,,,,330,,,"Direct",2564,1229,4867,
- -,GRU,MAD,LAN Airlines (LA),LAN Airlines,5202,10:54,,,,,330,,,"Codeshare",2564,1229,3200,
- -,GRU,MAD,Air Europa (UX),Air Europa,5202,10:54,,,,,332,,,"Direct",2564,1229,90,
- -,GRU,MAO,City Connexion Airlines (G3),City Connexion Airlines,1675,03:51,,,,,738,,,"Direct",2564,2551,1790,
- -,GRU,MAO,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1675,03:51,,,,,330 321 320,,,"Direct",2564,2551,4867,
- -,GRU,MCO,American Airlines (AA),American Airlines,4265,09:01,,,,,320,,,"Direct",2564,3878,24,
- -,GRU,MCO,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,4265,09:01,,,,,330,,,"Direct",2564,3878,4867,
- -,GRU,MCZ,City Connexion Airlines (G3),City Connexion Airlines,1192,02:53,,,,,738,,,"Direct",2564,2590,1790,
- -,GRU,MCZ,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1192,02:53,,,,,321,,,"Direct",2564,2590,4867,
- -,GRU,MCZ,Oceanair (O6),Oceanair,1192,02:53,,,,,318,,,"Direct",2564,2590,3764,
- -,GRU,MEX,AeroMéxico (AM),AeroMéxico,4616,09:43,,,,,777,,,"Direct",2564,1824,321,
- -,GRU,MEX,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,4616,09:43,,,,,330,,,"Direct",2564,1824,4867,
- -,GRU,MGF,City Connexion Airlines (G3),City Connexion Airlines,350,01:12,,,,,73G,,,"Direct",2564,2586,1790,
- -,GRU,MIA,American Airlines (AA),American Airlines,4082,08:39,,,,,773 777,,,"Direct",2564,3576,24,
- -,GRU,MIA,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,4082,08:39,,,,,773 777,,,"Direct",2564,3576,4867,
- -,GRU,MIA,US Airways (US),US Airways,4082,08:39,,,,,777,,,"Direct",2564,3576,5265,
- -,GRU,MUC,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,6121,12:44,,,,,346,,,"Codeshare",2564,346,4867,
- -,GRU,MUC,Lufthansa (LH),Lufthansa,6121,12:44,,,,,346,,,"Direct",2564,346,3320,
- -,GRU,MVD,BQB Lineas Aereas (5Q),BQB Lineas Aereas,974,02:26,,,,,AT7 319,,,"Direct",2564,2816,18232,
- -,GRU,MVD,City Connexion Airlines (G3),City Connexion Airlines,974,02:26,,,,,738,,,"Direct",2564,2816,1790,
- -,GRU,MVD,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,974,02:26,,,,,320,,,"Direct",2564,2816,4867,
- -,GRU,MVD,LAN Airlines (LA),LAN Airlines,974,02:26,,,,,320,,,"Codeshare",2564,2816,3200,
- -,GRU,MVD,TAM Mercosur (PZ),TAM Mercosur,974,02:26,,,,,320,,,"Direct",2564,2816,5156,
- -,GRU,MXP,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5890,12:16,,,,,330,,,"Direct",2564,1524,4867,
- -,GRU,NAT,City Connexion Airlines (G3),City Connexion Airlines,1425,03:21,,,,,738,,,"Direct",2564,2597,1790,
- -,GRU,NAT,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1425,03:21,,,,,321 320,,,"Direct",2564,2597,4867,
- -,GRU,NAT,Oceanair (O6),Oceanair,1425,03:21,,,,,320 318,,,"Direct",2564,2597,3764,
- -,GRU,NVT,City Connexion Airlines (G3),City Connexion Airlines,274,01:02,,,,,73G,,,"Direct",2564,2595,1790,
- -,GRU,OPO,TAP Portugal (TP),TAP Portugal,5080,10:39,,,,,332,,,"Direct",2564,1636,4869,
- -,GRU,ORD,United Airlines (UA),United Airlines,5234,10:58,,,,,777,,,"Direct",2564,3830,5209,
- -,GRU,PFB,Oceanair (O6),Oceanair,492,01:29,,,,,100,,,"Direct",2564,2602,3764,
- -,GRU,POA,City Connexion Airlines (G3),City Connexion Airlines,537,01:34,,,,,738 73G,,,"Direct",2564,2599,1790,
- -,GRU,POA,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,537,01:34,,,,,320 321 330,,,"Direct",2564,2599,4867,
- -,GRU,POA,Oceanair (O6),Oceanair,537,01:34,,,,,100 318,,,"Direct",2564,2599,3764,
- -,GRU,PTY,Copa Airlines (CM),Copa Airlines,3158,06:48,,,,,738,,,"Direct",2564,1871,1889,
- -,GRU,RAO,Changan Airlines (2Z),Changan Airlines,179,00:51,,,,,AT7,,,"Direct",2564,2613,1729,
- -,GRU,RAO,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,179,00:51,,,,,320 319,,,"Direct",2564,2613,4867,
- -,GRU,RAO,Marusya Airways (Y8),Marusya Airways,179,00:51,,,,,EM2 ER4,,,"Direct",2564,2613,16725,
- -,GRU,REC,City Connexion Airlines (G3),City Connexion Airlines,1304,03:06,,,,,738,,,"Direct",2564,2610,1790,
- -,GRU,REC,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1304,03:06,,,,,321 320,,,"Direct",2564,2610,4867,
- -,GRU,REC,Oceanair (O6),Oceanair,1304,03:06,,,,,320 318,,,"Direct",2564,2610,3764,
- -,GRU,ROS,City Connexion Airlines (G3),City Connexion Airlines,1087,02:40,,,,,738 73G,,,"Direct",2564,2440,1790,
- -,GRU,ROS,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1087,02:40,,,,,320,,,"Direct",2564,2440,4867,
- -,GRU,SCL,Sky Airline (H2),Sky Airline,1623,03:44,,,,,319,,,"Direct",2564,2650,4737,
- -,GRU,SCL,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1623,03:44,,,,,773 320 330,,,"Direct",2564,2650,4867,
- -,GRU,SCL,LAN Airlines (LA),LAN Airlines,1623,03:44,,,,,319 763 320,,,"Direct",2564,2650,3200,
- -,GRU,SDQ,Delta Air Lines (DL),Delta Air Lines,3286,07:04,,,,,738,,,"Codeshare",2564,1762,2009,
- -,GRU,SDQ,City Connexion Airlines (G3),City Connexion Airlines,3286,07:04,,,,,738,,,"Direct",2564,1762,1790,
- -,GRU,SDU,City Connexion Airlines (G3),City Connexion Airlines,213,00:55,,,,,738 73G,,,"Direct",2564,2612,1790,
- -,GRU,SJP,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,260,01:01,,,,,320 319,,,"Direct",2564,2619,4867,
- -,GRU,SLZ,City Connexion Airlines (G3),City Connexion Airlines,1447,03:23,,,,,738,,,"Direct",2564,2616,1790,
- -,GRU,SLZ,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1447,03:23,,,,,320,,,"Direct",2564,2616,4867,
- -,GRU,SSA,City Connexion Airlines (G3),City Connexion Airlines,901,02:18,,,,,738,,,"Direct",2564,2621,1790,
- -,GRU,SSA,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,901,02:18,,,,,320 321,,,"Direct",2564,2621,4867,
- -,GRU,SSA,Oceanair (O6),Oceanair,901,02:18,,,,,320 318,,,"Direct",2564,2621,3764,
- -,GRU,THE,City Connexion Airlines (G3),City Connexion Airlines,1291,03:04,,,,,738,,,"Direct",2564,2623,1790,
- -,GRU,THE,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,1291,03:04,,,,,320,,,"Direct",2564,2623,4867,
- -,GRU,UBA,Changan Airlines (2Z),Changan Airlines,270,01:02,,,,,AT7,,,"Direct",2564,2635,1729,
- -,GRU,UDI,Changan Airlines (2Z),Changan Airlines,333,01:09,,,,,AT7,,,"Direct",2564,2633,1729,
- -,GRU,UDI,City Connexion Airlines (G3),City Connexion Airlines,333,01:09,,,,,73G,,,"Direct",2564,2633,1790,
- -,GRU,UDI,Marusya Airways (Y8),Marusya Airways,333,01:09,,,,,EM2,,,"Direct",2564,2633,16725,
- -,GRU,UIO,TAME (EQ),TAME,2675,05:51,,,,,E70,,,"Direct",2564,2688,4863,
- -,GRU,VDC,Changan Airlines (2Z),Changan Airlines,695,01:53,,,,,AT7,,,"Direct",2564,6039,1729,
- -,GRU,VIX,City Connexion Airlines (G3),City Connexion Airlines,453,01:24,,,,,738 73G,,,"Direct",2564,2638,1790,
- -,GRU,VIX,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,453,01:24,,,,,320,,,"Direct",2564,2638,4867,
- -,GRU,VVI,City Connexion Airlines (G3),City Connexion Airlines,1148,02:47,,,,,738,,,"Direct",2564,2771,1790,
- -,GRU,VVI,Astrakhan Airlines (OB),Astrakhan Airlines,1148,02:47,,,,,733,,,"Direct",2564,2771,462,
- -,GRU,YYZ,Air Canada (AC),Air Canada,5088,10:40,,,,,763,,,"Direct",2564,193,330,
- -,GRU,YYZ,TAM Brazilian Airlines (JJ),TAM Brazilian Airlines,5088,10:40,,,,,763,,,"Codeshare",2564,193,4867,
- -,GRU,ZRH,Swiss International Air Lines (LX),Swiss International Air Lines,5967,12:26,,,,,343,,,"Direct",2564,1678,4559`;
      
      // Parse CSV data
      const lines = csvData.split('\n').slice(1); // Skip header
      const destinationMap = new Map();
      
      lines.forEach(line => {
        const columns = line.split(',');
        if (columns.length >= 7) {
          const to = columns[2].trim();
          const distance = parseInt(columns[5].trim());
          const duration = columns[6].trim(); // Duration column
          const airline = columns[4].trim();
          
          if (to && distance && !isNaN(distance)) {
            if (!destinationMap.has(to) || destinationMap.get(to).distance < distance) {
              destinationMap.set(to, { 
                airport: to, 
                distance: distance, 
                duration: duration,
                airline: airline,
                country: getCountryFromAirport(to)
              });
            }
          }
        }
      });
      
      // Convert to array and sort by distance (descending)
      const uniqueDestinations = Array.from(destinationMap.values())
        .sort((a, b) => b.distance - a.distance);
      
      setFlightData(uniqueDestinations);
    };
    
    processFlightData();
  }, []);
  
  // Helper function to get country from airport code
  const getCountryFromAirport = (airportCode) => {
    const countryMap = {
      'AEP': 'AR', 'AGT': 'AR', 'AEP': 'AR', 'EZE': 'AR',
      'AJU': 'BR', 'BEL': 'BR', 'BPS': 'BR', 'BSB': 'BR', 'CAC': 'BR', 'CGB': 'BR', 'CGR': 'BR', 'CNF': 'BR', 'COR': 'BR', 'CWB': 'BR', 'CWB': 'BR', 'FLN': 'BR', 'FOR': 'BR', 'GIG': 'BR', 'GYN': 'BR', 'IGU': 'BR', 'JOI': 'BR', 'JPA': 'BR', 'LDB': 'BR', 'MCZ': 'BR', 'MGF': 'BR', 'NAT': 'BR', 'NVT': 'BR', 'POA': 'BR', 'RAO': 'BR', 'REC': 'BR', 'ROS': 'BR', 'SDU': 'BR', 'SJP': 'BR', 'SLZ': 'BR', 'SSA': 'BR', 'THE': 'BR', 'UBA': 'BR', 'UDI': 'BR', 'VIX': 'BR',
      'AMS': 'NL', 'ATL': 'US', 'AUH': 'AE', 'BCN': 'ES', 'BGI': 'BB', 'BOG': 'CO', 'CCS': 'VE', 'CDG': 'FR', 'CLT': 'US', 'CMN': 'MA', 'DFW': 'US', 'DOH': 'QA', 'DTW': 'US', 'DXB': 'AE', 'EWR': 'US', 'FCO': 'IT', 'FRA': 'DE', 'IAD': 'US', 'IAH': 'US', 'ISL': 'TR', 'JFK': 'US', 'JNB': 'ZA', 'LAD': 'AO', 'LAX': 'US', 'LFW': 'ET', 'LHR': 'GB', 'LIM': 'PE', 'LIS': 'PT', 'MAD': 'ES', 'MAO': 'BR', 'MCO': 'US', 'MEX': 'MX', 'MIA': 'US', 'MUC': 'DE', 'MVD': 'UY', 'MXP': 'IT', 'OPO': 'PT', 'ORD': 'US', 'PTY': 'PA', 'SCL': 'CL', 'SDQ': 'DO', 'UIO': 'EC', 'VVI': 'BO', 'YYZ': 'CA', 'ZRH': 'CH',
      'ASU': 'PY', 'BQB': 'UY', 'CBB': 'BO', 'DOU': 'BR', 'JDO': 'BR', 'PFB': 'BR', 'VDC': 'BR'
    };
    return countryMap[airportCode] || 'XX';
  };

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
      setDimensions({
        width: screenWidth - 40, // Account for padding
        height: screenHeight - 200 // Account for header, title, and navigation hints
      });
    };

    updateDimensions();
    
    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current || flightData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    
    svg.attr('width', width).attr('height', height);
    
    // Create diamond layout
    const maxDistance = Math.max(...flightData.map(d => d.distance));
    const spacing = 8; // Spacing between rectangles
    
    // Calculate positions for diamond layout
    const centerY = height / 2;
    const centerX = width / 2;
    
    // Create diamond layout data
    const diamondData = [];
    const totalRectangles = flightData.length;
    const maxHeight = 100; // Height for the longest distance
    
    // Place longest distance at center, then alternate shorter distances above and below
    flightData.forEach((destination, index) => {
      const distanceRatio = destination.distance / maxDistance;
      const rectangleWidth = Math.max(distanceRatio * (width * 0.7), width * 0.1); // Scale width to occupy up to 70% of screen
      
      // Calculate height using gentler exponential decay
      let rectangleHeight;
      if (index === 0) {
        rectangleHeight = maxHeight; // Longest distance gets full height
      } else {
        // Use gentler exponential function: height = maxHeight * e^(-k * index)
        // where k controls the rate of decay (lower value = gentler decay)
        const decayRate = 0.15; // Reduced from 0.3 for gentler shrinking
        rectangleHeight = maxHeight * Math.exp(-decayRate * index);
        rectangleHeight = Math.max(rectangleHeight, 8); // Minimum 8px height
      }
      
      // Calculate opacity based on height (98% for tallest, 5% for shortest)
      const opacityRange = 0.98 - 0.05; // 98% to 5%
      const heightRatio = rectangleHeight / maxHeight;
      const opacity = 0.05 + (heightRatio * opacityRange);
      
      // Calculate font size proportional to rectangle height
      const fontSize = Math.max(rectangleHeight * 0.4, 8); // 40% of height, minimum 8px
      
      let yPosition;
      if (index === 0) {
        // Longest distance at center
        yPosition = centerY - rectangleHeight / 2;
      } else if (index % 2 === 1) {
        // Odd indices go above center - accumulate heights properly
        const totalHeightAbove = diamondData
          .filter((_, i) => i > 0 && i % 2 === 1)
          .reduce((sum, d) => sum + d.height + spacing, 0);
        yPosition = centerY - rectangleHeight / 2 - totalHeightAbove - rectangleHeight - spacing;
      } else {
        // Even indices go below center - accumulate heights properly
        const totalHeightBelow = diamondData
          .filter((_, i) => i > 0 && i % 2 === 0)
          .reduce((sum, d) => sum + d.height + spacing, 0);
        yPosition = centerY - rectangleHeight / 2 + totalHeightBelow + rectangleHeight + spacing;
      }
      
      diamondData.push({
        ...destination,
        width: rectangleWidth,
        height: rectangleHeight,
        x: centerX - rectangleWidth / 2, // Center align
        y: yPosition,
        distanceRatio: distanceRatio,
        opacity: opacity,
        fontSize: fontSize
      });
    });
    
    // Create rectangles
    const rectangles = svg.selectAll('rect')
      .data(diamondData)
      .enter()
      .append('rect')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('fill', '#ffffff')
      .attr('opacity', d => d.opacity)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight current rectangle
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#90EE90') // Light green
          .attr('opacity', 1.0);
        
        // Also highlight the corresponding text
        const textIndex = diamondData.findIndex(item => item.airport === d.airport);
        const texts = svg.selectAll('text');
        d3.select(texts.nodes()[textIndex])
          .transition()
          .duration(200)
          .attr('fill', '#90EE90') // Light green
          .attr('opacity', 1.0);
        
        // Show tooltip with flight data
        const tooltip = svg.append('g')
          .attr('id', 'tooltip');
        
        // Calculate safe tooltip position
        const tooltipX = Math.max(150, Math.min(width - 150, d.x + d.width / 2));
        const tooltipY = Math.max(50, Math.min(height - 50, d.y + d.height / 2));
        
        tooltip.attr('transform', `translate(${tooltipX}, ${tooltipY})`);
        
        // Background for tooltip
        const tooltipBg = tooltip.append('rect')
          .attr('x', -150)
          .attr('y', -40)
          .attr('width', 300)
          .attr('height', 95)
          .attr('fill', '#000000')
          .attr('stroke', '#90EE90')
          .attr('stroke-width', 2)
          .attr('opacity', 0.9)
          .attr('rx', 5);
        
        // Flight data text
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -20)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')
          .text(`${d.country} ${d.airport}`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '12px')
          .text(`Distance: ${d.distance.toLocaleString()} km`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 20)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '11px')
          .text(`Duration: ${d.duration}`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 35)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '10px')
          .text(`Airline: ${d.airline}`);
      })
      .on('mouseout', function(event, d) {
        // Restore original appearance
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#ffffff')
          .attr('opacity', d.opacity);
        
        // Also restore the corresponding text
        const textIndex = diamondData.findIndex(item => item.airport === d.airport);
        const texts = svg.selectAll('text');
        d3.select(texts.nodes()[textIndex])
          .transition()
          .duration(200)
          .attr('fill', '#ffffff')
          .attr('opacity', d.opacity);
        
        // Remove tooltip
        svg.select('#tooltip').remove();
      });
    
    // Add labels (country and airport code)
    const labels = svg.selectAll('text')
      .data(diamondData)
      .enter()
      .append('text')
      .attr('x', d => d.x + d.width + 5) // Position at right end of rectangle
      .attr('y', d => d.y + d.height / 2 + d.fontSize * 0.3) // Center vertically with font adjustment
      .attr('fill', '#ffffff')
      .attr('font-size', d => `${d.fontSize}px`)
      .attr('font-family', 'monospace')
      .attr('opacity', d => d.opacity)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight corresponding rectangle and text
        const rectIndex = diamondData.findIndex(item => item.airport === d.airport);
        const rectangles = svg.selectAll('rect');
        
        d3.select(rectangles.nodes()[rectIndex])
          .transition()
          .duration(200)
          .attr('fill', '#90EE90') // Light green
          .attr('opacity', 1.0);
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#90EE90') // Light green
          .attr('opacity', 1.0);
        
        // Show tooltip with flight data
        const tooltip = svg.append('g')
          .attr('id', 'tooltip');
        
        // Calculate safe tooltip position
        const tooltipX = Math.max(150, Math.min(width - 150, d.x + d.width / 2));
        const tooltipY = Math.max(50, Math.min(height - 50, d.y + d.height / 2));
        
        tooltip.attr('transform', `translate(${tooltipX}, ${tooltipY})`);
        
        // Background for tooltip
        const tooltipBg = tooltip.append('rect')
          .attr('x', -150)
          .attr('y', -40)
          .attr('width', 300)
          .attr('height', 95)
          .attr('fill', '#000000')
          .attr('stroke', '#90EE90')
          .attr('stroke-width', 2)
          .attr('opacity', 0.9)
          .attr('rx', 5);
        
        // Flight data text
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -20)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')
          .text(`${d.country} ${d.airport}`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '12px')
          .text(`Distance: ${d.distance.toLocaleString()} km`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 20)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '11px')
          .text(`Duration: ${d.duration}`);
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 35)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '10px')
          .text(`Airline: ${d.airline}`);
      })
      .on('mouseout', function(event, d) {
        // Restore original appearance
        const rectIndex = diamondData.findIndex(item => item.airport === d.airport);
        const rectangles = svg.selectAll('rect');
        
        d3.select(rectangles.nodes()[rectIndex])
          .transition()
          .duration(200)
          .attr('fill', '#ffffff')
          .attr('opacity', d.opacity);
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#ffffff')
          .attr('opacity', d.opacity);
        
        // Remove tooltip
        svg.select('#tooltip').remove();
      })
      .text(d => `${d.country} ${d.airport}`);
    
    // Add distance labels on the left side of longest rectangle
    const longestRect = diamondData.find(d => d.distance === maxDistance);
    if (longestRect) {
      svg.append('text')
        .attr('x', longestRect.x - 10)
        .attr('y', longestRect.y + longestRect.height / 2 + 4)
        .attr('fill', '#ffffff')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'end')
        .text('GRU');
    }

  }, [flightData, dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>GRU Flight Distances Visualization</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery
        </Text>
      )}
      <View style={styles.svgContainer}>
        <svg width={dimensions.width} height={dimensions.height} ref={svgRef}>
        </svg>
        <Image
          style={styles.icon}
          source={require("./assets/StartScreen.jpg")}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
