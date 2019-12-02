package com.bekmeh.shopping.list;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for the ListItem entity, enabling CRUD operations.
 */
public interface ListItemRepository extends JpaRepository<ListItem, Integer> {

}
