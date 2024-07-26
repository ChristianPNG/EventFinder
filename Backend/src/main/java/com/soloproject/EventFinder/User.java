package com.soloproject.EventFinder;
import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "USER")
public class User {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USERNAME")
    private String name;

    @Column(name = "PASSWORD")
    private String email;

    // getters and setters
}