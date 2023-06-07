import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
const input = document.querySelector<HTMLInputElement>('#title');
const form = document.querySelector('#form') as HTMLFormElement | null;
const taskArr: Task[] = getFromLocal();
taskArr?.forEach(addTodoTask);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value === '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  taskArr?.push(newTask);
  saveToLocal();
  addTodoTask(newTask);
  input.value = '';
});

function addTodoTask(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveToLocal();
  });

  checkbox.type = 'checkbox';

  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveToLocal() {
  localStorage.setItem('TASKS', JSON.stringify(taskArr));
}

function getFromLocal(): Task[] {
  try {
    const jsonData = localStorage.getItem('TASKS');
    if (jsonData == null) return [];
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}
