//package com.ucsbmap.ucsbmap;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

public class jdbcTest {
		
    public static void main(String[] args) {
        try{
	    dataSource();
	}
	catch(Exception e) {
	    e.printStackTrace();
	}
    }

    public static Connection dataSource() throws URISyntaxException, SQLException {
	URI dbUri = new URI(System.getenv("postgres://huajfrdimindgg:6c94dd43d06d04f5fb08d381e442cdbd6ded4b13bdd15f7566e358f07690b386@ec2-107-20-193-202.compute-1.amazonaws.com:5432/d8f1vveng0c16"));

	String username = "huajfrdimindgg";
	String password = "6c94dd43d06d04f5fb08d381e442cdbd6ded4b13bdd15f7566e358f07690b386";
	String ConnectionString = "jdbc:postgresql://ec2-107-20-193-202.compute-1.amazonaws.com:5432/d8f1vveng0c16?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

	return DriverManager.getConnection(ConnectionString, username, password);
    }
}
