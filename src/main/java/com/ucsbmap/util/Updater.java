import java.net.UnknownHostException;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;
import java.util.Arrays;
import com.mongodb.Block;

import com.mongodb.client.MongoCursor;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.result.DeleteResult;
import static com.mongodb.client.model.Updates.*;
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import java.util.List;

public class Updater {

  public static void main(String[] args) {


	ArrayList<Document> data = new ArrayList<Document>();

	String line = null;
	String temp = null;

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
		data.add(new Document(temp));
		temp = "";

	    }
	}

	for (Document d : data) {

	}
    }
}
