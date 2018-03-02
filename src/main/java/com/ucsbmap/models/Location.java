package com.ucsbmap.models;

import java.util.Date;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="locations")
public class Location {
    @Id
    private String id;
    
    @NotBlank
    @Indexed(unique=true)
    private String name;
    
    @NotBlank
    private String category;
    
    @NotBlank
    private String polygons;
    
    @NotBlank
    private String color;
            
    public Location() {
        super();
    }
    
    public Location(String name) {
        this.name = name;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getPolygons() {
        return polygons;
    }
    
    public void setPolygons(String polygons) {
        this.polygons = polygons;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
        
    @Override
    public String toString() {
        return String.format(
                "Location[id=%s, name='%s', category='%s', polygons='%s', color='%s']",
                id, name, category, polygons, color);
    }
}