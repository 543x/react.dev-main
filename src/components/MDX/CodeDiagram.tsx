import React, { Children, useMemo } from 'react';
import CodeBlock from './CodeBlock';

interface CodeDiagramProps {
  children: React.ReactNode;
  flip?: boolean;
}

export function CodeDiagram({ children, flip = false }: CodeDiagramProps) {
  

  if (flip) {
    return (
      <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        {illustration}
        <div className="flex flex-col justify-center">{content}</div>
      </section>
    );
  }
  return (
    <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col justify-center">{content}</div>
      <div className="py-4">{illustration}</div>
    </section>
  );
}
