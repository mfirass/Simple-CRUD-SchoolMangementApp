package me.firass.schoolmanagementproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private int age;
    private String teacher;
}
