import { SignupFormSchema, type FormState } from '@/app/lib/definitions'
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation';
import z from 'zod';
const bcrypt = require('bcrypt');
//rascunho. pode apagar

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  // ...
 
  // 2. Prepare data for insertion into database
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
    }
  }
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
  .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })
 
  const user = data[0]
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
 
  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/profile')
}
export async function logout() {
  await deleteSession()
  redirect('/login')
}