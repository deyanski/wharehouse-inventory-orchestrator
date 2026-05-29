# The Intelligent Warehouse & Inventory Orchestrator

## Project Overview

You are tasked with building a full-stack automation system for **"GlobalLogistics Corp."** Their warehouse currently struggles with manual inventory tracking and slow response times to product inquiries. Your solution will provide a real-time dashboard for adding and extracting items from the warehouse, track the quantities with live alerts and use AI Agent Assistant of querying live data via **MCP (Model Context Protocol)** and RAG.

---

## 1. Technical Stack Requirements

- **Backend:** n8n
- **Database:** Supabase (PostgreSQL for structured data + PGVector for RAG)
- **Connectivity:** Supabase MCP Server and PGVector/Supabase Vector Store (to bridge the Agent and the Database)
- **Frontend:** A "Vibecoded" app with IDE of your choice
- **AI Models:** All models - main and embedding are of your choice

---

## 2. Functional Requirements (The Core Tasks)

### Phase 1: The Data Foundation (Supabase)

- **Relational Tables:** Create an
  - **`inventory`** table with columns: `id`, `item_name`, `category`, `stock_level`, `reorder_point`, `price`, and `supplier_email`.
  - **`order_logs`** table with columns: `id`, `item_name`, `category`, `price`, `action` (inbound/outbound), `timestamp`.
- **RAG Knowledge Base:** Create a vector store table (e.g., **`product_manuals`**) containing embeddings of product specification text or warranty details that are used for internal purposes (An AI Assistant for internal use will have access to the data).
- Mock tables will be provided but you can generate your own ones as long as they keep the required structure.

### Phase 2: The Backend Logic (n8n)

You must build a main workflow that includes:

1. **Inventory Health Check:** There must be a logic that when executed from the frontend will check on the inventory list to identify items where `stock_level < reorder_point`. The logic can be triggered either manually or automatically as long as the required info is provided to the frontend and the employees know which items need to be ordered as they are low on stock.

2. **Inbound/Outbound Operations:** There must be a logic that accepts:
   - **a.** Items data input, the required operation (inbound/outbound), quantity and add or withdraw items from the inventory and add the operation to the logs.
   - **b.** When an outbound operation is requested for an item that does not have the required quantity — a message must be sent to the frontend instead notifying that the required outbound is higher than the available quantity and show the available quantity.
   - **c.** When an outbound operation is made successfully but the quantity falls below the required minimum quantity — a message must be sent to the frontend that the quantity of the product is below the required minimum quantity.

### Phase 3: The AI Agent & MCP Integration

- **Agent Configuration:** Build an **AI Agent Node** with a system prompt defining it as a "Warehouse Operations Specialist" that will have access to the databases in order to consume the information and answer questions.
- **MCP Tools:** Connect the **Supabase MCP Server**. The Agent must be able to:
  - Interact with the `inventory` and `logs` database so that information can be obtained, consumed and summarised.
- **RAG Tool:** The Agent must use a **Vector Store Tool** to answer technical questions from the `product_manuals` data.
- Add **memory** to the Agent either with Simple memory or use Supabase.

### Phase 4: The Frontend (Vibecoding)

- **Dashboard:** Create a clean UI that can:
  - Accept inbound requests — adding items to the inventory
  - Accept outbound requests — withdrawing items from the inventory
  - Fetch all the items in the inventory that are below the required minimum quantity and list them
- **AI Chat Interface:** A chat section where users can interact directly with the n8n AI Agent in order to ask questions about the inventory, logs or manuals. Such questions can be:
  - *"When was the last outbound operation for item X?"*
  - *"How many X have we sold over the last three months?"*
  - *"What does the manual about X say?"*
  - and etc.

---

## 3. Advanced Requirements (The "Pro" Layer)

- **Error Handling:** Create a dedicated **Error Workflow** in n8n that will send an error notification to the frontend if such occurs in the process.
- **Jailbreak Prevention:** Harden your Agent's system prompt in order to prevent it from deviating from warehouse-related tasks.

---

## 4. Deliverables

All deliverables must be in one GitHub repository.

1. **n8n Workflow Files:** Exported `.json` files of your Main Workflows and Error Workflow.
2. **Supabase SQL:** A script or screenshot showing your table structures.
3. **Frontend:** Your frontend logic with additional guides on localhost deployment.

---

## 5. Evaluation Rubric (100 Points Total)

| Criteria | Points |
|---|---|
| **Database Mastery:** Correct Supabase setup (Tables + Vector Store). | 25 |
| **Agent & MCP:** The Agent successfully uses MCP tools to read/write to the DB. | 30 |
| **Vibecoding:** The frontend is functional, aesthetic, and connected to n8n. | 25 |
| **Robustness:** Proper Error Handling and Jailbreak prevention implemented. | 20 |
