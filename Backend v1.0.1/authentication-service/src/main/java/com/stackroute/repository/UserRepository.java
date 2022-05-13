package com.stackroute.repository;

import com.stackroute.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,String> {
    public Optional<User> findByUserEmailAndPassword(String userEmail,String password);

}
