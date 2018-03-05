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

    //should be able to be blank
    private String website;

    //should be able to be blank
    private String image;

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

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return String.format(
                "Location[id=%s, name='%s', category='%s', polygons='%s', color='%s', website='%s', image='%s']",
                id, name, category, polygons, color, website, image);
    }
}
