package de.fhdortmund.seelab.springbootexample.repositories;

import de.fhdortmund.seelab.springbootexample.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface UserRepository extends CrudRepository<User, Long> {
}
