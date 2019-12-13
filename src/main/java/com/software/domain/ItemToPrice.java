package com.software.domain;

public class ItemToPrice 
{
	private String tablename; 
    /**
     *  ID
     */
    private Integer id;

    /**
     *  name
     */
    private String name;

    /**
     *  retailPrice
     */
    
    private Float retailprice;

    /**
     *  wholesalePrice
     */
    private Float wholesaleprice;

    /**
     *  purchasePrice
     */
    private Float purchaseprice;

    /**
     *  time
     */
    private String time;

    public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Float getRetailprice() {
        return retailprice;
    }

    public void setRetailprice(Float retailprice) {
        this.retailprice = retailprice;
    }

    public Float getWholesaleprice() {
        return wholesaleprice;
    }

    public void setWholesaleprice(Float wholesaleprice) {
        this.wholesaleprice = wholesaleprice;
    }

    public Float getPurchaseprice() {
        return purchaseprice;
    }

    public void setPurchaseprice(Float purchaseprice) {
        this.purchaseprice = purchaseprice;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time == null ? null : time.trim();
    }
}