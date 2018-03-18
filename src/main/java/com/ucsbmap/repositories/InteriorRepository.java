package com.ucsbmap.repositories;

import com.ucsbmap.models.Interior;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteriorRepository extends MongoRepository<Interior, String> {

}
