package com.bekmeh.shopping.list;

public class ListItem {

    private final Long id;
    private final String name;
    private final Double price;

    public ListItem(final Long id, final String name, final Double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Double getPrice() {
        return this.price;
    }
}
