"use client";

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ReportingLayout, RecipientsTable } from '@/components/reporting';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBatchEmailData } from '@/constants/batchEmails';

const page = () => {
  const params = useParams();
  const templateId = params.id as string;
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Get template data based on ID
  const templateData = getBatchEmailData(templateId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ReportingLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/reporting/batch-emails" className="hover:text-gray-700 dark:hover:text-gray-300">
              Recent Batch Emails
            </Link>
            <span>›</span>
            <span>Contact First Name</span>
          </div>
          
          {/* Main Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
                             <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                 {templateData?.templateName || "Don't miss out: Book your Kimp.io demo call to learn more about the Down Payment Boost"}
               </h1>
            </div>
            <Button 
              type="primary" 
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              onClick={showModal}
            >
              View Email
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <RecipientsTable />
      </div>

      {/* Email Template Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📧</span>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900">Email Template Preview</div>
              <div className="text-sm text-gray-500 truncate">
                {templateData?.templateName || "Don't miss out: Book your Kimp.io demo call to learn more about the Down Payment Boost"}
              </div>
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="done" 
            type="primary" 
            onClick={handleCancel} 
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 h-10 rounded-lg font-medium"
          >
            Done
          </Button>
        ]}
        width={900}
        className="email-template-modal"
        styles={{
          header: {
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '16px',
            marginBottom: '0'
          },
          body: {
            padding: '24px',
            backgroundColor: '#fafafa'
          },
          footer: {
            borderTop: '1px solid #e5e7eb',
            paddingTop: '16px',
            textAlign: 'right'
          }
        }}
      >
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Email Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">From: Ven Velnayagam</div>
                <div className="text-xs text-gray-500">Kimp.io Team</div>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6 space-y-6">
            {/* Subject Line */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Subject</div>
              <div className="text-lg font-medium text-gray-900">
                Contact First Name - Don't miss out: Book your Kimp.io demo call to learn more about the Down Payment Boost
              </div>
            </div>

            {/* Email Body */}
            <div className="space-y-5 text-gray-700 leading-relaxed">
              <div className="text-base">
                <span className="font-semibold text-gray-900">Hi %contact_first_name%,</span>
              </div>
              
              <div className="text-base">
                I hope you're doing well! I'm excited to let you know that you have a great profile and you are very likely to qualify for our 
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md font-medium mx-1">Down Payment Boost Program</span>. 
                The program is designed to help Canadians buy a home sooner saving up to 2% of the purchase price.
              </div>
              
              <div className="text-base">
                For this reason, I'd love to schedule a relaxed 20-minute chat with you to walk through how the program works. During our call, we'll review the qualification requirements, run some tailored calculations for your situation, and address any questions you may have.
              </div>
              
              <div className="text-base">
                We're offering just <span className="font-semibold text-red-600">100 spots each month</span>, so it's a great way to stay ahead and keep your options open. If you're interested, please book a time that works for you here:
              </div>
              
              <div className="pt-3">
                <a href="#" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                  <span>📅</span>
                  <span>Calendly Link</span>
                </a>
              </div>
              
              <div className="text-base">
                Even if you're not ready to take action right away, many of our buyers have found this call really helpful for future planning, and I would be happy to help out!
              </div>
            </div>
          </div>

          {/* Email Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>Kimp.io - Down Payment Boost Program</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>ven@kimp.io</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ReportingLayout>
  );
};

export default page;
