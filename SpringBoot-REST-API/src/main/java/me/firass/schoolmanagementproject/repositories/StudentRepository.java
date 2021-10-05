package me.firass.schoolmanagementproject.repositories;

import me.firass.schoolmanagementproject.models.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {

}
