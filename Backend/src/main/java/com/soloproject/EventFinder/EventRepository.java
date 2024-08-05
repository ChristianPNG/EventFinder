package com.soloproject.EventFinder;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long>  {
    Event findByName(String name);
    Event findById(int id);
}
