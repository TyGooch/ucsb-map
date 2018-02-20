package com.ucsbmap.ucsbmap

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Iterator;
import java.util.ArrayList;

import java.sql.*;

public class geoJsonParser {
		
    public static void main(String[] args) {

	Class.forName("org.postgresql.Driver");
	String url = "jdbc:postgres://huajfrdimindgg:6c94dd43d06d04f5fb08d381e442cdbd6ded4b13bdd15f7566e358f07690b386@ec2-107-20-193-202.compute-1.amazonaws.com:5432/d8f1vveng0c16");
	
	ArrayList <JSONObject> json = new ArrayList<JSONObject>();
	ArrayList <String> jsonString = new ArrayList<String>();
	JSONObject obj;
	
	
	String filename = "/cs/student/ehenderson/cs48/ucsb-map/src/main/app/src/util/ucsbBuildings.json";
	
	String line = null;
	String temp = null;
	
	try {
	    FileReader fr = new FileReader(filename);
	    
	    BufferedReader br = new BufferedReader(fr);
	    
	    while ((line = br.readLine()) != null) {
		temp += line;
		if(line.contains("\"id\":")) {
		    line = br.readLine();
		    temp += line;
		    if(temp != null && temp.length > 0) {
			temp = temp.substring(0,temp.length()-1);
		    }
		    jsonString.add(temp);
		    temp = "";
		}
	    }
	    
	    for (String s : jsonString) {
		obj = (JSONObject) new JSONParser().parse(s);
		json.add(obj);
	    }
	    
	    Connection conn = DriverManager.getConnection(url);
	    
	    br.close();
	}
	catch(exception e){
	    System.out.println("There was an error");
	    e.printStackTrace();
	}
    }
}	

