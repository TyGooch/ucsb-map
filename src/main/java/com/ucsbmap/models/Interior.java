package com.ucsbmap.models;

import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="interiors")
public class Interior {
    @NotBlank
    @Indexed(unique=true)
    private String name;

    @NotBlank
    private String building;

    @NotBlank
    private String polygons;

    @NotBlank
    private String level;

    public Interior() {
        super();
    }

    public Interior(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getPolygons() {
        return polygons;
    }

    public void setPolygons(String polygons) {
        this.polygons = polygons;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return String.format(
                "Interior[name='%s', building='%s', polygons='%s', level='%s']",
                name, building, polygons, level);
    }
}
