package org.example.rest_js.repository;

import org.example.rest_js.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(value = "User.roles", type = EntityGraph.EntityGraphType.FETCH)
    Optional<User> findByName(String name);

}
