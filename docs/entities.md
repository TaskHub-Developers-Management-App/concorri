# 📌 Entities Tracking

## 👤 User
A user must be the owner of a **store**.

| Attribute  | Description |
|------------|------------|
| **id** | Unique identifier for the store |
| **name** | Store's official name |
| **email** | Store's contact email (must be unique) |
| **password** | Hashed password for authentication |
| **createdAt** | Timestamp indicating when the store was created |
| **updatedAt** | Timestamp indicating when the store was last updated |

## 🏪 Store  
A store can have multiple **lotteries** and belongs to an **user**.  

| Attribute  | Description |
|------------|------------|
| **id** | Unique identifier for the store |
| **name** | Store's official name |
| **phone** | WhatsApp number of the store (must be unique) |
| **address** | Store's physical address |
| **ownerId** | Reference to the user who owns this store |
| **createdAt** | Timestamp indicating when the store was created |
| **updatedAt** | Timestamp indicating when the store was last updated |

## 🎟️ Lottery  
A lottery belongs to a **store** and can have multiple **coupons**.  

| Attribute  | Description |
|------------|------------|
| **id** | Unique identifier for the lottery |
| **storeId** | Reference to the store that owns this lottery |
| **name** | Name of the lottery |
| **description** | Details about the lottery |
| **status** | Current status of the lottery (e.g., "ACTIVE", "INACTIVE") |
| **drawDate** | Date when the lottery will be drawn |
| **createdAt** | Timestamp indicating when the lottery was created |

## 🎫 Coupon  
A coupon belongs to a **lottery**.  

| Attribute  | Description |
|------------|------------|
| **id** | Unique identifier for the coupon |
| **lotteryId** | Reference to the lottery associated with this coupon |
| **customerName** | Full name of the customer using the coupon |
| **customerPhone** | Customer's WhatsApp number for contact |
| **customerAddress** | Customer's delivery or billing address |
| **customerCPF** | Customer's CPF (Brazilian ID) |
| **createdAt** | Timestamp indicating when the coupon was generated |