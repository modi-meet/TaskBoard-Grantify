import type { Context, Config } from "@netlify/functions";
import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo'
  }
}, {
  timestamps: true,
});

// Get or create the Task model
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

// Database connection with caching for serverless
let cachedConnection: typeof mongoose | null = null;

async function connectDB(): Promise<typeof mongoose> {
  if (cachedConnection && cachedConnection.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUri = Netlify.env.get("MONGO_URI");
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  cachedConnection = await mongoose.connect(mongoUri);
  return cachedConnection;
}

// Handler for all task operations
export default async (req: Request, context: Context) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Path will be like /api/tasks or /api/tasks/:id
    const taskId = pathParts.length > 2 ? pathParts[2] : null;

    switch (req.method) {
      case "GET":
        return await getTasks();
      case "POST":
        return await createTask(req);
      case "PUT":
        if (!taskId) {
          return new Response(JSON.stringify({ message: "Task ID required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        return await updateTask(req, taskId);
      case "DELETE":
        if (!taskId) {
          return new Response(JSON.stringify({ message: "Task ID required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        return await deleteTask(taskId);
      default:
        return new Response(JSON.stringify({ message: "Method not allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ message: error instanceof Error ? error.message : "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

async function getTasks(): Promise<Response> {
  const tasks = await Task.find();
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function createTask(req: Request): Promise<Response> {
  const body = await req.json();

  if (!body.content) {
    return new Response(JSON.stringify({ message: "Content is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const task = await Task.create({
    content: body.content,
    columnId: body.columnId || 'todo'
  });

  return new Response(JSON.stringify(task), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

async function updateTask(req: Request, taskId: string): Promise<Response> {
  const body = await req.json();

  const task = await Task.findById(taskId);
  if (!task) {
    return new Response(JSON.stringify({ message: "Task not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });

  return new Response(JSON.stringify(updatedTask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteTask(taskId: string): Promise<Response> {
  const task = await Task.findById(taskId);
  if (!task) {
    return new Response(JSON.stringify({ message: "Task not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  await task.deleteOne();

  return new Response(JSON.stringify({ id: taskId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  path: ["/api/tasks", "/api/tasks/*"],
};
