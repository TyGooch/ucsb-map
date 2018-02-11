package com.ucsbmap.ucsbmap

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Iterator;
import java.util.ArrayList;

public class geoJsonParser {
		
	public static void main(String[] args) {

		ArrayList <JSONObject> json = new ArrayList<JSONObject>();
		JSONObject obj;


		String filename = "/cs/student/ehenderson/cs48/ucsb-map/src/main/app/src/util/ucsbBuildings.js"

		String line = null;

		try {
			FileReader fr = new FileReader(filename);

			BufferedReader br = new BufferedReader(fr);

			while ((line = br.readLine()) != null) {
				obj = (JSONObject) new JSONParser().parse(line);
				json.add(obj);
				//put it somewhere

			}

			br.close();
		}
		catch(exception e){
			System.out.println("There was an error");
			e.printStackTrace();
		}
	}
}	

