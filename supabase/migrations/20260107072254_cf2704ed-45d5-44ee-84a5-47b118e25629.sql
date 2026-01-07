-- Drop overly permissive RLS policies
DROP POLICY IF EXISTS "Anyone can view quotes" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can update quotes" ON public.quotes;

-- Keep the public INSERT policy for form submissions (this stays as-is)
-- "Anyone can submit a quote" policy remains active

-- Add secure policies for authenticated users only
CREATE POLICY "Authenticated users can view all quotes"
ON public.quotes
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quotes"
ON public.quotes
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete quotes"
ON public.quotes
FOR DELETE
USING (auth.role() = 'authenticated');