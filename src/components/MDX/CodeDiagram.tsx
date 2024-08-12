import React, { Children, useMemo } from 'react';
import CodeBlock from './CodeBlock';

interface CodeDiagramProps {
  children: React.ReactNode;
  flip?: boolean;
}

export function CodeDiagram({ children, flip = false }: CodeDiagramProps) {
  const illustration = useMemo(() => {
    // 过滤出所有的React元素，并检查它们的type是否为'img'
    return Children.toArray(children).filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && typeof child.type === 'string' && child.type === 'img'
    );
  }, [children]);

  const content = useMemo(() => {
    return Children.toArray(children).map((child, index) => {
      if (React.isValidElement(child) && child.type?.mdxName === 'pre') {
        return <CodeBlock key={`codeblock-${index}`} {...child.props} noMargin noMarkers />;
      }
      // 如果我们不需要特别处理img元素（因为它们已经在illustration中），我们可以直接返回其他类型的子元素
      return child;
      // 或者，如果你想要为所有非CodeBlock的子元素包裹一个div，并添加key：
      // return <div key={`other-${index}`}>{child}</div>;
    });
  }, [children]);

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
